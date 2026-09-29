package com.fitness.aiservice.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
public class GeminiService {
    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final String MODEL = "gemini-3.6-flash";

    public GeminiService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    public String getRecommendations(String input){
        Map<String, Object> body = new HashMap<>();
        body.put("model", MODEL);
        body.put("input", input);

        String response = webClient.post()
                .uri(geminiApiUrl)
                .header("Content-Type", "application/json")
                .header("X-goog-api-key", geminiApiKey)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;

    }
}
