package com.ganesh;

import com.ganesh.dao.UserDao;
import com.ganesh.model.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
	@Bean
   public Docket documentation() {
       return new Docket(DocumentationType.SWAGGER_2)
               .select()
               .apis(RequestHandlerSelectors.any())
               .paths(regex("/.*"))
               .build()
               .pathMapping("/")
               .apiInfo(metadata());
   }

   @Bean
   public UiConfiguration uiConfig() {
       return UiConfiguration.DEFAULT;
   }

   private ApiInfo metadata() {
       return new ApiInfoBuilder()
               .title("Employee Maintenance API")
               .description("API Documentation for Employee API")
               .version("1.0")
               .contact(new Contact("Ganesh Bandaru","datanomist.com","ganeshbandaru@datanomist.com"))
               .build();
   }
	
    @Bean
    CommandLineRunner initUser(UserDao userDao, BCryptPasswordEncoder passwordEncoder){
        return args -> {
            userDao.deleteAll();
            User user = new User("ganesh", "ganesh", "ganesh", passwordEncoder.encode("ganesh"), 12345, 34);
            userDao.save(user);
        };
    }
	
	
	

}
