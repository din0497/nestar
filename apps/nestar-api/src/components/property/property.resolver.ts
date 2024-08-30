import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { Property } from '../../libs/dto/property/property';
import { PropertyInput } from '../../libs/dto/property/property.input';

@Resolver()
export class PropertyResolver {
    constructor(private readonly propertyService: PropertyService) { }
    
    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => Property)
    public async createProperty(
        @Args("input") input: PropertyInput,
        @AuthMember("_id") memberId: ObjectId,
    ): Promise<Property> {
        console.log("Mutation: PropertyResolver");
        input.memberId = memberId;
        return await this.propertyService.createProperty(input);
    }
    
}
 