package com.alvaro.anonovo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Resposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @ElementCollection
    private List<String> respostas;

    public Resposta() {}

    public Resposta(String nome, List<String> respostas) {
        this.nome = nome;
        this.respostas = respostas;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public List<String> getRespostas() { return respostas; }
    public void setRespostas(List<String> respostas) { this.respostas = respostas; }
}
