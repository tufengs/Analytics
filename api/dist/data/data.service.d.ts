/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Model } from 'mongoose';
import { Data } from './schemas/data.schema';
export declare class DataService {
    private dataModel;
    constructor(dataModel: Model<Data>);
    create(createDatumDto: CreateDatumDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Data> & Data & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Data> & Data & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Data, "find">;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Data> & Data & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Data> & Data & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Data, "find">;
    findOne(id: number): string;
    update(id: number, updateDatumDto: UpdateDatumDto): string;
    remove(id: number): string;
}
