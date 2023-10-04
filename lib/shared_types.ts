// A "type" can be defined with the `type` keyword or the `interface` keyword.
// They may seem similar, but there are some differences. For more information,
// see: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// A general rule of thumb is to always use `type` unless you have a good reason
// to use `interface`. `interface` is more powerful, at the cost of baring more
// footguns.
export type DiaryData = {
    id: string;
    description: string;
    date: string;
    tags: Array<Number>;
    emotions: Array<Number>;
};

export type GetDiariesResponse = DiaryData[];

export type GetDiaryResponse = DiaryData;

// Types can also be derived from other types using utility types. These are
// a few examples of utility types:
// for more information, see: https://www.typescriptlang.org/docs/handbook/utility-types.html
// You don't need to memorize these, but it's good to know they exist.
export type CreateDiaryPayload = Omit<DiaryData, "id">;

export type CreateDiaryResponse = Pick<DiaryData, "id">;

export type UpdateDiaryPayload = Partial<Omit<DiaryData, "id">>

export type UpdateDiaryResponse = "OK";

export type DeleteDiaryResponse = "OK";