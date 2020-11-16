package com.example.demo;

import com.example.demo.dao.DishDAO;
import com.example.demo.sercurity.UrlAuthenSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DemoApplication extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UrlAuthenSuccessHandler urlAuthenSuccessHandler;

    @Autowired
    private static DishDAO dishDAO;

    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        //request hop le
        http.authorizeRequests()
                .antMatchers("/login", "/logout", "/loginError", "/assets/**", "/ckeditor/**", "/css_customize/**", "/global_assets/**", "/js_templates/**").permitAll()
//                .antMatchers("/**").hasRole("ADMIN")
                .antMatchers("/**").permitAll()
                .and().exceptionHandling().accessDeniedPage("/access-denied");
        http.authorizeRequests().and()
                .formLogin()
                .loginPage("/login").loginProcessingUrl("/login")
                .usernameParameter("username").passwordParameter("password")
                .failureUrl("/").successHandler(urlAuthenSuccessHandler)
                .and().logout().logoutUrl("/").logoutSuccessUrl("/login")
                .deleteCookies("JSESSIONID").invalidateHttpSession(true);
    }
}
