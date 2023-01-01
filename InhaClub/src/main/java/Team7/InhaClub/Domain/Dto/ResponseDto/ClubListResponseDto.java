package Team7.InhaClub.Domain.Dto.ResponseDto;

import Team7.InhaClub.Domain.Entity.Club;
import lombok.Getter;

import java.util.List;

@Getter
public class ClubListResponseDto {

    private final List<Club> clubList;
    private final List<String> clubTagList;

    public ClubListResponseDto(List<Club> _clubList, List<String> _clubTagList) {
        this.clubList = _clubList;
        this.clubTagList = _clubTagList;
    }

}
