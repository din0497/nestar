import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardArticleService } from './board-article.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BoardArticle, BoardArticles } from '../../libs/dto/board-article/board-article';
import {
    AllBoardArticlesInquiry,
    BoardArticleInput,
    BoardArticlesInquiry,
} from '../../libs/dto/board-article/board-article.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoObjId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';
import { BoardArticleUpdate } from '../../libs/dto/board-article/board-article.update';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver()
export class BoardArticleResolver {
    constructor(private readonly boardArticleService: BoardArticleService) { }

    @UseGuards(AuthGuard)
    @Mutation((returns) => BoardArticle)
    public async createBoardArticle(
        @Args('input') input: BoardArticleInput,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticle> {
        console.log('Mutation: CerateBoardAtricle');
        return await this.boardArticleService.createBoardArticle(memberId, input);
    }

    @UseGuards(WithoutGuard)
    @Query((returns) => BoardArticle)
    public async getBoardArticle(
        @Args('articleId') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticle> {
        console.log('Mutation: getBoardArticle');
        const articleId = shapeIntoMongoObjId(input);
        return await this.boardArticleService.getBoardArticle(memberId, articleId);
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => BoardArticle)
    public async updateBoardArticle(
        @Args('input') input: BoardArticleUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticle> {
        console.log('Mutation: updateBoardArticle');
        input._id = shapeIntoMongoObjId(input._id);
        console.log({"input": input, 'memberId':memberId});
        
        return await this.boardArticleService.updateBoardArticle(memberId, input);
    }
    @UseGuards(WithoutGuard)
    @Query((returns) => BoardArticles)
    public async getBoardArticles(
        @Args('input') input: BoardArticlesInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticles> {
        console.log('Mutation: getBoardArticles');
        return await this.boardArticleService.getBoardArticles(memberId, input);
    }


    // admin

}