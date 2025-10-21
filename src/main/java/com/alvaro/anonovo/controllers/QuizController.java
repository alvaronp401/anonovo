package com.alvaro.anonovo.controllers;

import com.alvaro.anonovo.model.Resposta;
import com.alvaro.anonovo.repository.RespostaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class QuizController {

    @Autowired
    private RespostaRepository respostaRepository;

    // 🔹 Rota para receber as respostas via JavaScript (POST /salvar)
    @PostMapping("/salvar")
    @ResponseBody
    public String salvarRespostas(@RequestBody Map<String, Object> payload) {
        String nome = (String) payload.get("nome");
        List<String> respostas = (List<String>) payload.get("respostas");

        Resposta r = new Resposta(nome, respostas);
        respostaRepository.save(r);

        return "Respostas salvas com sucesso!";
    }

    // 🔹 Rota para exibir a página com as respostas e o gráfico
    @GetMapping("/respostas")
    public String listarRespostas(Model model) {
        List<Resposta> respostas = respostaRepository.findAll();
        model.addAttribute("respostas", respostas);
        return "respostas"; // renderiza respostas.html
    }

    // 🔹 Rota que fornece os dados em formato JSON (usado pelo gráfico)
    @GetMapping("/respostas/json")
    @ResponseBody
    public List<Resposta> listarRespostasJson() {
        return respostaRepository.findAll();
    }
}
