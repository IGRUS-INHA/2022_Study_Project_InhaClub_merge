package Team7.InhaClub.Domain.Dto.ResponseDto;

import lombok.Getter;
import java.util.List;

@Getter
public class InfoResponseDto {
    private final ClubResponseDto clubDto;
    private final PostResponseDto postDto;
    private final List<CommentsResponseDto> commentsDto;

    public InfoResponseDto(ClubResponseDto _clubDto, PostResponseDto _postDto, List<CommentsResponseDto> _commentsDto) {
        this.clubDto = _clubDto;
        this.postDto = _postDto;
        this.commentsDto = _commentsDto;
    }
}