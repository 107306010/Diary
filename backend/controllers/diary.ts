import DiaryModel from '../models/diary';
import { genericErrorHandler } from "../utils/errors";
import type { GetDiariesResponse,
  GetDiaryResponse,
  CreateDiaryPayload,
  CreateDiaryResponse,
  UpdateDiaryPayload,
  UpdateDiaryResponse,
  DeleteDiaryResponse
} from '@lib/shared_types';
import type { Request, Response } from "express";

// Get all diaries
export const getDiaries = async (_: Request, res: Response<GetDiariesResponse>) => {
    try {
      const dbDiaries = await DiaryModel.find({});
      const diaries = dbDiaries.map((diary) => ({
        id: diary.id as string,
        description: diary.description,
        date: diary.date || '',
        tags: diary.tags || [],
        emotions: diary.emotions || []
      }));
      
      return res.status(200).json(diaries);
    } catch (error) {   
      // Check the type of error
      genericErrorHandler(error, res);
    }
};

// Get a diary
export const getDiary = async (req: Request<{id: string}>, res: Response<GetDiaryResponse | { error: string }> ) => {
    try {
        const { id } = req.params
        const diary = await DiaryModel.findById(id);
        if (!diary) {
            return res.status(404).json({ error: "id is not valid" });
        }

      return res.status(200).json({
        id: diary.id as string,
        description: diary.description,
        date: diary.date || '',
        tags: diary.tags || [],
        emotions: diary.emotions || []
      });
    } catch (error) {   
      // Check the type of error
      genericErrorHandler(error, res);
    }
};

// create a diary
export const createDiary = async(
    req: Request<never, never, CreateDiaryPayload>,
    res: Response<CreateDiaryResponse | { error: string }>,
    ) => {
        try {
          const { id } = await DiaryModel.create(req.body);

          return res.status(201).json({ id });
            
          } catch (error) {
          // Check the type of error
          genericErrorHandler(error, res);
        }
}

// update a diary
export const updateDiary = async(
  req: Request<{ id: string }, never, UpdateDiaryPayload>,
  res: Response<UpdateDiaryResponse | { error: string }>,
  ) =>{
    try {
      const { id } = req.params;
      const { description, tags, emotions } = req.body;

      // Check if the diary exists
      const oldDiary = await DiaryModel.findById(id);
      if (!oldDiary) {
        return res.status(404).json({ error: "id is not valid" });
      }

      const newDiary = await DiaryModel.findByIdAndUpdate(
        id,
        {
          description,
          tags,
          emotions
        },
        { new: true },
      );

      if (!newDiary) {
        return res.status(404).json({ error: "id is not valid" });
      }

      return res.status(200).send("OK");
        
      } catch (error) {
      // Check the type of error
      genericErrorHandler(error, res);
    }
}

// delete a diary
export const deleteDiary = async(
  req: Request<{ id: string }>,
  res: Response,
  ) => {
    try {
      const { id } = req.params;
  
      // Delete the diary from the database
      const deletedDiary = await DiaryModel.findByIdAndDelete(id);
      
      if (!deletedDiary) {
        return res.status(404).json({ error: "id is not valid" });
      }
  
      return res.status(200).send("OK");
    } catch (error) {
      genericErrorHandler(error, res);
    }
}