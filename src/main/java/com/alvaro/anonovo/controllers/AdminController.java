package com.alvaro.anonovo.controllers;

import com.alvaro.anonovo.model.Resposta;
import com.alvaro.anonovo.service.RespostaService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private RespostaService service;

    // 🔑 senha de administrador
    private static final String SENHA_ADMIN = "Laudemiro3@";

    // Página inicial do admin: login se não autenticado
    @GetMapping
    public String adminHome(HttpSession session) {
        if (session.getAttribute("adminLogado") == null) {
            return "login-admin"; // página de login
        }
        return "redirect:/admin/painel";
    }

    // Painel do administrador (somente se logado)
    @GetMapping("/painel")
    public String painelAdmin(Model model, HttpSession session) {
        if (session.getAttribute("adminLogado") == null) {
            return "redirect:/admin";
        }
        List<Resposta> respostas = service.listarTodas();
        model.addAttribute("respostas", respostas);
        return "admin";
    }

    // Valida senha e faz login
    @PostMapping("/login")
    public String login(@RequestParam String senha, HttpSession session, Model model) {
        if (SENHA_ADMIN.equals(senha)) {
            session.setAttribute("adminLogado", true);
            return "redirect:/admin/painel";
        }
        model.addAttribute("erro", "Senha incorreta ❌");
        return "login-admin";
    }

    // Faz logout e volta ao login
    @GetMapping("/logout")
    public String logout(HttpSession session, Model model) {
        session.invalidate();
        model.addAttribute("mensagem", "Sessão encerrada com sucesso 🔒");
        return "login-admin";
    }

    // Excluir uma resposta
    @PostMapping("/deletar/{id}")
    public String deletar(@PathVariable Long id, HttpSession session) {
        if (session.getAttribute("adminLogado") == null) return "redirect:/admin";
        service.deletarPorId(id);
        return "redirect:/admin/painel";
    }

    // Limpar todas as respostas
    @PostMapping("/limpar")
    public String limparTudo(HttpSession session) {
        if (session.getAttribute("adminLogado") == null) return "redirect:/admin";
        service.deletarTudo();
        return "redirect:/admin/painel";
    }
}
