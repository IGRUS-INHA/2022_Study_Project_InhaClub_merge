package Team7.InhaClub.Controller.APIController;

import Team7.InhaClub.Domain.Dto.RequestDto.EmailRequestDto;
import Team7.InhaClub.Domain.Dto.JoinDto;
import Team7.InhaClub.Domain.Dto.LoginDto;
import Team7.InhaClub.Domain.Dto.ResponseDto.TokenResponseDto;
import Team7.InhaClub.Domain.Entity.User;
import Team7.InhaClub.Service.AuthService;
import Team7.InhaClub.Service.EmailAuthService;
import antlr.Token;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.util.Random;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Slf4j
@CrossOrigin
public class AuthApiController {
    private final EmailAuthService emailAuthService;
    private final AuthService authService;
    long seed = System.currentTimeMillis();
    private String emailAuthCode = new Random(seed).toString();

    /** 회원가입 */
    @PostMapping(value = "/auth")
    public ResponseEntity<User> join(@RequestBody JoinDto joinDto, HttpServletResponse response) throws Exception {
        User user = joinDto.toEntity();

        User responseUser = authService.join(user);
        if (responseUser == null) {
            log.info("Failed to join user.");// 로그를 찍을 자리
            throw new Exception("회원 저장에 실패했습니다.");
        } else {
            log.info("User(" + user.getUserId() +") has be registered."); // 로그를 찍을 자리
            return ResponseEntity.status(HttpStatus.OK).body(responseUser);
        }
    }

    /** id 중복 검사 */
    @PostMapping(value = "/auth/checkDuplicatedId")
    public Boolean checkDuplicatedId(@RequestBody JoinDto joinDto) {
        return authService.chkDuplicatedId(joinDto.getUserId());
    }

    /** Email 중복 검사 */
    @PostMapping(value = "/auth/checkDuplicatedEmail")
    public Boolean checkDuplicatedEmail(@RequestBody JoinDto joinDto) {
        return authService.chkDuplicatedId(joinDto.getUserEmail());
    }

    /** 인증 이메일 보내기 */
    @PostMapping(value = "/auth/mailConfirm")
    public Boolean emailConfirm(@RequestBody EmailRequestDto emailRequestDto, HttpServletResponse response) throws Exception {
        if (authService.chkDuplicatedEmail(emailRequestDto.getUserEmail())) {
            return false;
        }
        else {
            String code = emailAuthService.sendSimpleMessage(emailRequestDto.getUserEmail());
            setEmailAuthCode(code);
            log.info("email chk : " + emailRequestDto.getUserEmail());
            return true;
        }
    }

    /** 이메일 인증 */
    @PostMapping(value = "/auth/mailConfirmChk")
    @ResponseBody
    public Boolean checkEmailConfirm(@RequestBody EmailRequestDto emailRequestDto) throws Exception {
        if (getEmailAuthCode().equals(emailRequestDto.getCode())) {
            log.info(emailAuthCode + ", " + emailRequestDto.getCode() + "check success");
            return true;
        } else {
            log.info(emailAuthCode + ", " + emailRequestDto.getCode() + "check failed");
            return false;
        }
    }

    /** 로그인 */
    @PostMapping(value = "/doLogin")
    public ResponseEntity<TokenResponseDto> login(@RequestBody LoginDto loginDto) throws Exception {
        System.out.println(loginDto.getUserId() + ", " + loginDto.getUserPw());
        TokenResponseDto token = authService.doLogin(loginDto);
        log.info("login - " + loginDto.getUserId());
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    private String getEmailAuthCode() {
        return emailAuthCode;
    }
    private void setEmailAuthCode(String emailAuthCode) {
        this.emailAuthCode = emailAuthCode;
    }
}