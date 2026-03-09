package com.example.Academy.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.core.userdetails.UserDetailsService;



@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;


    public SecurityConfig(
        JwtAuthenticationFilter jwtAuthenticationFilter,
        UserDetailsService userDetailsService) {
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    this.userDetailsService = userDetailsService;
}
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // El origen de tu React
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        
        // Métodos permitidos
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // IMPORTANTE: En lugar de "*", seamos específicos con los headers
        configuration.setAllowedHeaders(List.of(
            "Authorization", 
            "Content-Type", 
            "Accept", 
            "X-Requested-With", 
            "Cache-Control"
        ));
        
        // Permitir que los headers de respuesta sean visibles si fuera necesario
        configuration.setExposedHeaders(List.of("Authorization"));
        
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    


    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


   @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        
        

        http
            .csrf(csrf -> csrf.disable())
             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider())
            .authorizeHttpRequests(auth -> auth

                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                //AUTENTICACIÓN / REGISTRO
                // =========================
                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/auth/me").authenticated()
                .requestMatchers(
                    "/alumnos/register", "/alumnos/auth",
                    "/docentes/register", "/docentes/auth"
                ).permitAll()

                // CURSOS
                // =========================
                .requestMatchers(HttpMethod.GET, "/cursos/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/cursos/**").hasAnyRole("ADMIN", "DOCENTE")
                .requestMatchers(HttpMethod.PUT,  "/cursos/**").hasAnyRole("ADMIN", "DOCENTE")
                .requestMatchers(HttpMethod.DELETE, "/cursos/**").hasRole("ADMIN")

                // ALUMNOS
                // =========================
                .requestMatchers(HttpMethod.POST, "/alumnos/create").hasAnyRole("ADMIN", "DOCENTE")
                .requestMatchers(HttpMethod.PUT, "/alumnos/**").hasAnyRole("ADMIN", "DOCENTE")
                .requestMatchers(HttpMethod.DELETE, "/alumnos/**").hasAnyRole("ADMIN", "DOCENTE")
                .requestMatchers(HttpMethod.GET, "/alumnos/**").authenticated()


                .requestMatchers(HttpMethod.GET, "/alumnos/**").hasAnyRole("ADMIN", "DOCENTE")

                                
                // DOCENTES
                // =========================
               
                .requestMatchers(HttpMethod.DELETE, "/docentes/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/docentes/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/docentes/create").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/docentes").authenticated()
                .requestMatchers(HttpMethod.GET, "/docentes/**").hasAnyRole("ADMIN", "DOCENTE")


                // NIVELES
                // =========================
                .requestMatchers(HttpMethod.GET, "/niveles/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/niveles/crear/**").hasRole("ADMIN")

            
                // ASISTENCIAS
                // =========================
                //.requestMatchers(HttpMethod.GET, "/asistencias/**")
                //    .hasAnyRole("ADMIN", "DOCENTE", "ALUMNO")
                //.requestMatchers(HttpMethod.POST, "/asistencias/**")
                //    .hasAnyRole("ADMIN", "DOCENTE")
                .requestMatchers(HttpMethod.GET, "/asistencias/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/asistencias/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/asistencias/**")
                    .hasAnyRole("ADMIN", "DOCENTE")
                .requestMatchers(HttpMethod.DELETE, "/asistencias/**")
                    .hasAnyRole("ADMIN", "DOCENTE")

                // FILES
                // =========================
                .requestMatchers(HttpMethod.POST, "/files/upload")
                    .hasAnyRole("ADMIN", "DOCENTE")
                .requestMatchers(HttpMethod.GET, "/files/download/**")
                    .authenticated()

                
                //EXÁMENES
                // =========================
                .requestMatchers(HttpMethod.POST, "/examenes/**")
                .hasAnyRole("DOCENTE", "ADMIN")

                .requestMatchers(HttpMethod.PUT, "/examenes/**")
                .hasAnyRole("DOCENTE", "ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/examenes/**")
                .hasAnyRole("DOCENTE", "ADMIN")

                .requestMatchers(HttpMethod.GET, "/examenes/**")
                .hasAnyRole("DOCENTE", "ALUMNO", "ADMIN")
                

                //TAREAS
                // =========================
                .requestMatchers(HttpMethod.POST, "/tareas/**")
                .hasAnyRole("DOCENTE", "ADMIN")

                .requestMatchers(HttpMethod.PUT, "/tareas/**")
                .hasAnyRole("DOCENTE", "ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/tareas/**")
                .hasAnyRole("DOCENTE", "ADMIN")

                .requestMatchers(HttpMethod.GET, "/tareas/**")
                .hasAnyRole("DOCENTE", "ALUMNO", "ADMIN")

                //AVISOS
                .requestMatchers(HttpMethod.POST, "/avisos").hasAnyRole("ADMIN", "DOCENTE")

                
                // ENTREGAS
                // =========================
                .requestMatchers(HttpMethod.POST, "/entregas/tarea/*/alumno/*")
                .hasAnyRole("ALUMNO", "ADMIN", "DOCENTE")

                .requestMatchers(HttpMethod.POST, "/entregas/examen/*/alumno/*")
                .hasAnyRole("ALUMNO", "ADMIN", "DOCENTE")

                .requestMatchers(HttpMethod.GET, "/entregas/**")
                .hasAnyRole("DOCENTE", "ALUMNO", "ADMIN")

                .requestMatchers(HttpMethod.PUT, "/entregas/**")
                .hasAnyRole("DOCENTE", "ADMIN", "ALUMNO")

                .requestMatchers(HttpMethod.DELETE, "/entregas/**")
                .hasAnyRole("DOCENTE", "ADMIN")

                // MATERIAL CURSO
                // =========================
                .requestMatchers(HttpMethod.POST, "/materiales/**")
                    .hasAnyRole("ADMIN", "DOCENTE")

                .requestMatchers(HttpMethod.GET, "/materiales/**")
                    .hasAnyRole("ADMIN", "DOCENTE", "ALUMNO")

                .requestMatchers(HttpMethod.DELETE, "/materiales/**")
                    .hasAnyRole("ADMIN", "DOCENTE")


                // MERCADO PAGO
                // =========================
                .requestMatchers(HttpMethod.POST, "/pagos/mercadoPago").permitAll()
                .requestMatchers(HttpMethod.POST, "/pagos/webhook").permitAll()
                .requestMatchers(HttpMethod.GET, "/pagos/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/pagos/crear").authenticated()
                .requestMatchers("/webhooks/**").permitAll()
                .requestMatchers("/auth/**").permitAll()                            
                
                .requestMatchers(HttpMethod.POST, "/nivel").permitAll()

                
                // ADMIN
                // =========================
                .requestMatchers("/admin/**").hasRole("ADMIN")

                
                .anyRequest().authenticated()
            ) 
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

} 