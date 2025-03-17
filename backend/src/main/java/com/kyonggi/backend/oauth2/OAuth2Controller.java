package com.kyonggi.backend.oauth2;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class OAuth2Controller {

    @GetMapping("/naver")
    public ResponseEntity<?> getNaverLoginUrl() {
        String naverAuthUrl =
               // "https://nid.naver.com/oauth2.0/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&state=random_state_value";
        "http://localhost:8080/oauth2/authorization/naver";

        return ResponseEntity.ok(naverAuthUrl);
    }

    @GetMapping("/token")
    public ResponseEntity<?> getAccessToken(@CookieValue(value = "access_token", required = false) String accessToken) {
        if (accessToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access token not found");
        }
        return ResponseEntity.ok(Collections.singletonMap("accessToken", accessToken));
    }
}
