import { ArtistService, IArtist, IArtistInput, Omit_IArtist_id_or_created_at_or_updated_at_ } from "../../../services/index";
import { useApiService } from "../useApihandle";

export const useGetArtists = () => {
  const { handleRequest, isLoading } = useApiService();

  const apiHit = async (pageNumber: number, rowsPerPage: number) => {
    const data = await handleRequest(ArtistService.getArtist(pageNumber, rowsPerPage));
    return data;
  };

  return { apiHit, isLoading };
};

export const useDeleteArtist = () => {
  const { handleRequest } = useApiService();

  const apiHit = async (artistId: string) => {
    const data = await handleRequest(ArtistService.deleteArtist(artistId));
    return data;
  };

  return { apiHit };
};


export const useEditArtist = () => {
  const { handleRequest } = useApiService();

  const apiHit = async (artistId: string, updated_body: Partial<IArtist>) => {
    const data = await handleRequest(ArtistService.updateArtist(artistId, updated_body));
    return data;
  };

  return { apiHit };
};

export const useSaveArtist = () => {
  const { handleRequest } = useApiService();

  const apiHit = async (body: IArtistInput) => {
    const data = await handleRequest(ArtistService.createArtist(body));
    return data;
  };

  return { apiHit };
};
