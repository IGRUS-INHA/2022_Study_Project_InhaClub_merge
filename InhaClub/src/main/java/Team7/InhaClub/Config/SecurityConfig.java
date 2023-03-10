package Team7.InhaClub.Config;

import Team7.InhaClub.Security.JwtAuthenticationFilter;
import Team7.InhaClub.Security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/** Jwt 의 설정 정의 */
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Profile("!https")
public class SecurityConfig {

    private final JwtProvider jwtProvider;

    @Bean
    public PasswordEncoder passwordEncoder() throws Exception { // Password Encoder 정의
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception { // AuthenticationManager 정의
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { // filterChain 의 설정 정의
        http
                .httpBasic()
                    .disable() // Security 기본 로그인페이지 미제공
                .formLogin()
                    .disable()// Security 기본 폼 로그인 미제공
                .cors()
                    .configurationSource(corsConfigurationSource())
                    .and()
                .csrf()
                    .disable() // Cross Site Request Forgery 미허용
                    .authorizeRequests()
                    .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Spring Security 에서 Session 을 생성하지 않고 기존 것도 사용하지 않음
                    .and() // 2회 이상으로 함수가 들어갔을때 상위로 올라오는 함수
                .authorizeRequests() // 요청에 의한 보안검사
                    //.antMatchers(HttpMethod.GET, "/", "/favicon.ico", "/join", "/login", "/club/**", "/user/login").permitAll()
                    //.antMatchers(HttpMethod.POST, "/api/doLogin", "/api/auth", "/api/auth/**").permitAll() // antMatchers 에서 설정된 리소스의 접근을 인증절차 없이 모두 허용으로 함
                    .anyRequest().permitAll()
                    .and()
                .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/")
                    .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("http://localhost:3000"); // 로컬
        //config.addAllowedOrigin(""); // 프론트 IPv4 주소
        config.addAllowedMethod("*"); // 모든 메소드 허용.
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
