package Team7.InhaClub.Controller;

import Team7.InhaClub.Service.AuthService;
import Team7.InhaClub.Service.EmailAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class AuthController {
    private final AuthService authService;
    private final EmailAuthService emailAuthService;

    /** 회원가입 페이지 이동 */
    @GetMapping(value = "/user/auth")
    public ModelAndView createAuthForm() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/user/authForm");
        return modelAndView;
    }

    /** 로그인 페이지 이동 */
    @GetMapping(value = "/user/login")
    public ModelAndView createLoginForm() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("/user/loginForm");
        return modelAndView;
    }

}
