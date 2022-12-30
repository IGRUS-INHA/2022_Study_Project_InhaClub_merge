package Team7.InhaClub.Domain.Dto.ResponseDto;

import Team7.InhaClub.Domain.Entity.Club;
import lombok.Getter;

import java.util.List;

@Getter
public class ClubListResponseDto {

    private final List<Club> clubList;

    public ClubListResponseDto(List<Club> _clubList)
    {
        this.clubList = _clubList;
    }
}
