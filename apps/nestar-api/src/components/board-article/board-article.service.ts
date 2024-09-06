import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { Model, ObjectId } from "mongoose";
import {
    BoardArticle,
    BoardArticles,
} from "../../libs/dto/board-article/board-article";
import { InjectModel } from "@nestjs/mongoose";
import { ViewService } from "../view/view.service";
import { MemberService } from "../member/member.service";
import {
    AllBoardArticlesInquiry,
    BoardArticleInput,
    BoardArticlesInquiry,
} from "../../libs/dto/board-article/board-article.input";
import { Direction, Message } from "../../libs/enums/common.enum";
import { BoardArticleStatus } from "../../libs/enums/board-article.enum";
import { ViewGroup } from "../../libs/enums/view.enum";
import { StatisticModifier, T } from "../../libs/types/common";
import { BoardArticleUpdate } from "../../libs/dto/board-article/board-article.update";
import {
    lookupMember,
    shapeIntoMongoObjId,
} from "../../libs/config";
import { lookup } from "dns/promises";
import { LikeGroup } from "../../libs/enums/like.enum";

@Injectable()
export class BoardArticleService {
    constructor(
        @InjectModel("BoardArticle")
        private readonly boardArticleModel: Model<BoardArticle>,
        private readonly memberService: MemberService,
        private readonly viewService: ViewService,
    ) { }

   
}