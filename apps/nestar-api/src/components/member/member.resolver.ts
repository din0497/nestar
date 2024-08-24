import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) { }

	@Mutation(() => Member)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		console.log('Mutation: signup');
		return this.memberService.signup(input);
	}

	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		console.log('Mutation: login');
		return this.memberService.login(input);
	}

	// Authenticated
	@UseGuards(AuthGuard)
	@Mutation(() => String)
	public async updateMember(@AuthMember('_id') memberId: string): Promise<string> {
		console.log('Mutation: updateMember');
		console.log(typeof memberId);
		console.log(memberId);


		return this.memberService.updateMember();
	}

	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('Query: checkAuth');
		return memberNick

	}

	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('Query: getMember');
		return this.memberService.getMember();
	}

	/**  ADMIN **/

	// Authorization: ADMIN
	@Mutation(() => String)
	public async getAllMembersByAdmin(): Promise<string> {
		console.log('Mutation: getAllMembersByAdmin');
		return this.memberService.getAllMembersByAdmin()

	}

	// Authorization: ADMIN
	@Mutation(() => String)
	public async updateMemberByAdmin(): Promise<string> {
		console.log('Mutation: updateMemberByAdmin');
		return this.memberService.updateMemberByAdmin()

	}
}



