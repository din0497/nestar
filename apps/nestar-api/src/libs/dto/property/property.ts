import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { PropertyLocation, PropertyStatus, PropertyType } from '../../enums/property.enum';
import { Member, TotalCounter } from '../member/member';
import { MeLiked } from '../like/like';

@ObjectType()
export class Property {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => PropertyType)
	propertyType: PropertyType;

	@Field(() => PropertyStatus)
	propertyStatus: PropertyStatus;

	@Field(() => PropertyLocation)
	propertyLocation: PropertyLocation;

	@Field(() => String)
	propertyAddress: string;

	@Field(() => String)
	propertyTitle: string;

	@Field(() => Number)
	propertyPrice: number;

	@Field(() => Number)
	propertySquare: number;

	@Field(() => Int)
	propertyBeds: number;

	@Field(() => Int)
	propertyRooms: number;

	@Field(() => Int)
	propertyViews: number;

	@Field(() => Int)
	propertyLikes: number;

	@Field(() => Int)
	propertyComments: string;

	@Field(() => Int)
	propertyRank: number;

	@Field(() => [String])
	propertyImages: string[];

	@Field(() => String, { nullable: true })
	propertyDesc?: string;

	@Field(() => Boolean)
	propertyBarter: boolean;

	@Field(() => Boolean)
	propertyRent: boolean;

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => Date, { nullable: true })
	soldAt?: number;

	@Field(() => Date, { nullable: true })
	deletedAt?: number;

	@Field(() => Date, { nullable: true })
	constructedAt?: number;

	@Field(() => Date)
	createdAt: number;

	@Field(() => Date)
	updatedAt: number;

	/** from aggrigation**/

	@Field(() => Member, { nullable: true })
	memberData?: Member;

	@Field(() => [MeLiked], { nullable: true })
	meLiked?: MeLiked[];
}

@ObjectType()
export class Properties {
	@Field(() => [Property])
	list: Property[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}
