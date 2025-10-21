package com.alvaro.anonovo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index"; // Página principal
    }

    @GetMapping("/mensagem")
    public String mensagem() {
        return "mensagem"; // Página de mensagem
    }
}
