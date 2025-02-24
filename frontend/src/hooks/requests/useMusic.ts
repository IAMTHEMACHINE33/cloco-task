import {IMusic, IMusicInput, MusicService} from "../../../services";
import { useApiService } from "../useApihandle";

export const useSaveMusic = () => {
    const { handleRequest } = useApiService();

    const apiHit = async (body: IMusicInput) => {
        const data = await handleRequest(MusicService.createMusic(body));
        return data;
    };

    return { apiHit };
};

export const useGetArtistMusic = () => {
    const { handleRequest } = useApiService();

    const apiHit = async (artistId: string) => {
        const data = await handleRequest(MusicService.getArtistMusic(artistId));
        return data;
    };

    return { apiHit };
};

export const useDeleteMusic = () => {
  const { handleRequest } = useApiService();

    const apiHit = async (musicId: string) => {
        const data = await handleRequest(MusicService.deleteMusic(musicId));
        return data;
    };

    return { apiHit };
};


export const useEditMusic = () => {
    const { handleRequest } = useApiService();

    const apiHit = async (musicId: string, updated_body: Partial<IMusic>) => {
        const data = await handleRequest(MusicService.updateMusic(musicId, updated_body));
        return data;
    };

    return { apiHit };
};
