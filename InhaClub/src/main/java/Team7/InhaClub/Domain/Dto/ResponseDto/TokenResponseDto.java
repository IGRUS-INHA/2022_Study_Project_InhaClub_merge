package Team7.InhaClub.Domain.Dto.ResponseDto;

import lombok.*;

/** token 객체를 정의한다. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponseDto {
    /** access token */
    private String ACCESS_TOKEN;
    /** refresh token */
    private String REFRESH_TOKEN;
}