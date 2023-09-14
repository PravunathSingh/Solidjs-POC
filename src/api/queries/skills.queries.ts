import { createQuery, createMutation } from '@tanstack/solid-query';
import { IGetQuery } from '../../types/requests';
import { getSkills } from '../requests/skills.requests';

export const useSkills = (payload: IGetQuery) =>
  createQuery(
    () => ['skills', payload],
    async () => {
      const skills = await getSkills(payload);
      return skills;
    },
    {
      keepPreviousData: true,
    }
  );
