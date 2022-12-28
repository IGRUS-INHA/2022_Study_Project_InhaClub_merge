package Team7.InhaClub.Controller.APIController;

import Team7.InhaClub.Domain.Dto.UserDto;
import Team7.InhaClub.Domain.Entity.User;
import Team7.InhaClub.Service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Slf4j
@CrossOrigin
public class UserApiController {

    private final UserService userService;

    /** 회원 탈퇴 */
    @DeleteMapping(value = "/user/userWithdraw")
    public ResponseEntity<UserDto> userWithdraw(@RequestBody UserDto userDto) {
        userService.userDelete(userDto);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    /** 회원 정보 수정 */
    @PostMapping(value = "/user/userUpdate")
    public ResponseEntity<UserDto> userUpdate(@RequestBody UserDto userDto) {
        userService.userUpdate(userDto);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    /** 회원 리스트 전송 */
    @PostMapping(value = "/user")
    public List<User> list(Model model) {

        return userService.findUsers();
    }
}
