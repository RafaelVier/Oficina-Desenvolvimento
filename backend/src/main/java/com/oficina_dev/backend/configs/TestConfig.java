package com.oficina_dev.backend.configs;

import com.oficina_dev.backend.models.Address.Address;
import com.oficina_dev.backend.models.Person.Person;
import com.oficina_dev.backend.repositories.AddressRepository;
import com.oficina_dev.backend.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.UUID;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    PersonRepository personRepository;

    @Override
    public void run(String... args) throws Exception {
        Address address = new Address(
                4232,
                "Avenida Brasil",
                "Independência",
                null,
                "Perto do Enjoy"
        );

        address = this.addressRepository.saveAndFlush(address);

        Person person = new Person("Zé", "45998269093",
                                "10070080090", "zebonito@gmail.com", address);


        person = this.personRepository.saveAndFlush(person);
        System.out.println("Test ADDRESS initialized: " + address.toString());
        System.out.println("Test PERSON initialized: " + person.toString());
    }
}
