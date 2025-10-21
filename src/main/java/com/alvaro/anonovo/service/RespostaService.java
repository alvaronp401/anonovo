package com.alvaro.anonovo.service;

import com.alvaro.anonovo.model.Resposta;
import com.alvaro.anonovo.repository.RespostaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RespostaService {

    @Autowired
    private RespostaRepository repository;

    public List<Resposta> listarTodas() {
        return repository.findAll();
    }

    public void deletarPorId(Long id) {
        repository.deleteById(id);
    }

    public void deletarTudo() {
        repository.deleteAll();
    }
}
