import { ISkill } from '../../types/entities';
import { IGetQuery } from '../../types/requests';

const url = import.meta.env.VITE_API_URL;

// the return value of this function is Array<ISkill>
export const getSkills = async (payload: IGetQuery): Promise<ISkill[]> => {
  const response = await fetch(
    `${url}/skills?_page=${payload.page}&_limit=${payload.limit}`
  );

  const data = await response.json();
  return data;
};
