package com.oficina_dev.backend.configs;

import com.oficina_dev.backend.models.State.State;
import com.oficina_dev.backend.repositories.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {
    @Autowired
    private StateRepository stateRepository;

    @Override
    public void run(String... args) throws Exception {
        State state = new State();
        state.setName("Paraná");
        state.setAbbreviation("PR");
        stateRepository.save(state);

    }
}
