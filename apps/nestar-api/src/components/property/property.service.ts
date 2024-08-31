import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import { Properties, Property } from '../../libs/dto/property/property';
import { AgentPropertiesInquiry, PropertiesInquiry, PropertyInput } from '../../libs/dto/property/property.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { PropertyStatus } from '../../libs/enums/property.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ViewService } from '../view/view.service';
import { PropertyUpdate } from '../../libs/dto/property/property.update';
import * as moment from 'moment';
import { lookupMember, shapeIntoMongoObjId } from '../../libs/config';

@Injectable()
export class PropertyService {
    constructor(
        @InjectModel('Property') private readonly propertyModel: Model<Property>,
        private memberService: MemberService,
        private viewService: ViewService,) { }
    public async createProperty(input: PropertyInput): Promise<Property> {
        try {
            const result = await this.propertyModel.create(input);
            console.log("result:", result);
            await this.memberService.memberStatsEditor({
                _id: result.memberId,
                targetKey: "memberProperties",
                modifier: 1,
            });
            return result;
        } catch (err) {
            console.log("Error, propertService.Model:", err);
            throw new BadRequestException(Message.CREATE_FAILED);
        }
    }

    public async getProperty(
        memberId: ObjectId,
        propertyId: ObjectId,
    ): Promise<Property> {
        const search: T = {
            _id: propertyId,
            propertyStatus: PropertyStatus.ACTIVE,
        };


        const targetProperty: Property = await this.propertyModel.findOne(search).lean().exec();
        if (!targetProperty)
            throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        if (memberId) {
            const viewInput = {
                memberId: memberId,
                viewRefId: propertyId,
                viewGroup: ViewGroup.PROPERTY,
            };
            const newView = await this.viewService.recordView(viewInput);
            if (newView) {
                await this.propertyStatsEditor({
                    _id: propertyId,
                    targetKey: "propertyViews",
                    modifier: 1,
                });
                targetProperty.propertyViews++;
            }
        }
        // meLiked

        targetProperty.memberData = await this.memberService.getMember(
            null,
            targetProperty.memberId,
        );


        return targetProperty;
    }

    public async updateProperty(
        memberId: ObjectId,
        input: PropertyUpdate,
    ): Promise<Property> {
        let { propertyStatus, soldAt, deletedAt } = input;
        const search: T = {
            _id: input._id,
            memberId: memberId,
            propertyStatus: PropertyStatus.ACTIVE,
        };
        if (propertyStatus === PropertyStatus.SOLD) soldAt = moment().toDate();
        else if ((propertyStatus = PropertyStatus.DELETE))
            deletedAt = moment().toDate();

        const result = await this.propertyModel
            .findByIdAndUpdate(search, input, { new: true })
            .exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (soldAt || deletedAt) {
            await this.memberService.memberStatsEditor({
                _id: memberId,
                targetKey: "memberProperties",
                modifier: -1,
            });
        }
        return result;
    }

    public async getProperties(
        memberId: ObjectId,
        input: PropertiesInquiry,
    ): Promise<Properties> {
        const match: T = { propertyStatus: PropertyStatus.ACTIVE };
        const sort: T = {
            [input?.sort ?? "createdAt"]: input?.direction ?? Direction.DESC,
        };

        this.shapeMatchQuery(match, input);
        console.log("match:", match);

        const result = await this.propertyModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [
                            { $skip: (input.page - 1) * input.limit },
                            { $limit: input.limit },
                            lookupMember,
                            { $unwind: "$memberData" },
                        ],
                        metaCounter: [{ $count: "total" }],
                    },
                },
            ])
            .exec();

        if (!result.length)
            throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0];
    }

    public async getAgentProperties(
        memberId: ObjectId,
        input: AgentPropertiesInquiry,
    ): Promise<Properties> {
        const { propertyStatus } = input.search;
        if (propertyStatus === PropertyStatus.DELETE)
            throw new BadRequestException(Message.NOT_ALLOWED_REQUEST);

        const match: T = {
            memberId: memberId,
            propertyStatus: propertyStatus ?? { $ne: PropertyStatus.DELETE },
        };
        const sort: T = {
            [input?.sort ?? "createdAt"]: input?.direction ?? Direction.DESC,
        };

        const result = await this.propertyModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [
                            { $skip: (input.page - 1) * input.limit },
                            { $limit: input.limit },
                            // Me Liked
                            lookupMember,
                            { $unwind: "$memberData" },
                        ],
                        metaCounter: [{ $count: "total" }],
                    },
                },
            ])
            .exec();

        if (!result.length)
            throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0];
    }

    public async propertyStatsEditor(
        input: StatisticModifier,
    ): Promise<Property> {
        const { _id, targetKey, modifier } = input;
        return await this.propertyModel
            .findByIdAndUpdate(
                _id,
                { $inc: { [targetKey]: modifier } },
                { new: true },
            )
            .exec();
    }

    private shapeMatchQuery(match: T, input: PropertiesInquiry): void {
        const {
            memberId,
            locationList,
            roomsList,
            bedsList,
            typeList,
            periodsRange,
            pricesRange,
            squaresRange,
            options,
            text,
        } = input.search;
        if (memberId) match.memberId = shapeIntoMongoObjId(memberId);
        if (locationList && locationList.length) match.propertyLocation = { $in: locationList };
        if (roomsList && roomsList.length) match.propertyRooms = { $in: roomsList };
        if (bedsList && bedsList.length) match.propertyBeds = { $in: bedsList };
        if (typeList && typeList.length) match.propertyType = { $in: typeList };

        if (pricesRange)
            match.propertyPrice = { $gte: pricesRange.start, $lte: pricesRange.end };
        if (periodsRange)
            match.createdAt = { $gte: periodsRange.start, $lte: periodsRange.end };
        if (squaresRange)
            match.propertySquare = {
                $gte: squaresRange.start,
                $lte: squaresRange.end,
            };

        if (text) match.propertyTitle = { $regex: new RegExp(text, "i") };
        if (options) {
            match["$or"] = options.map((ele) => {
                return { [ele]: true };
            });
        }
    }



}


