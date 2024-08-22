import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) { }

	@Mutation(() => Member)
	@UsePipes(ValidationPipe)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		try {
			console.log('Mutation: sigup');
			console.log('DTO', input);
			return this.memberService.signup(input);
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}

	@Mutation(() => Member)
	@UsePipes(ValidationPipe)
	public async login(@Args('data') input: LoginInput): Promise<Member> {

		try {
			console.log('Mutation: login');
			console.log('login', input);
			return this.memberService.login(input);
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}

	@Mutation(() => String)
	public async updateMember(): Promise<string> {
		console.log('Mutation: updateMember');
		return this.memberService.updateMember();
	}
	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('Query: getMember');
		return this.memberService.getMember();
	}
}
