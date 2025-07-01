package com.oficina_dev.backend.services;

import com.oficina_dev.backend.dtos.Limit.LimitRequestDto;
import com.oficina_dev.backend.dtos.Limit.LimitResponseDto;
import com.oficina_dev.backend.exceptions.EntityAlreadyExists;
import com.oficina_dev.backend.mappers.LimitMapper;
import com.oficina_dev.backend.models.Limit;
import com.oficina_dev.backend.repositories.LimitRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class LimitService {

    private static final Logger logger = LoggerFactory.getLogger(LimitService.class);
    private final String limitNotFoundMessage = "Limit not found";

    @Autowired
    private LimitRepository limitRepository;

    @Autowired
    private LimitMapper limitMapper;

    public Limit findById(UUID id) {
        logger.debug("Finding limit by ID in database: {}", id);
        return limitRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Limit with ID {} not found", id);
                    return new EntityNotFoundException(limitNotFoundMessage);
                });
    }

    public Limit findByYearAndMonth(Integer year, Integer month) {
        logger.debug("Finding limit by Year: {}, Month: {}", year, month);
        return limitRepository.findByYearAndMonth(year, month)
                .orElseThrow(() -> {
                    logger.error("Limit for Year: {} and Month: {} not found", year, month);
                    return new EntityNotFoundException(limitNotFoundMessage);
                });
    }

    public List<LimitResponseDto> getAll() {
        logger.debug("Service: Fetching all limits");
        List<Limit> limits = this.limitRepository.findAll();
        logger.debug("Found {} limits in database", limits.size());
        return limits.stream()
                .map(this.limitMapper::toResponse)
                .toList();
    }

    public LimitResponseDto getById(UUID id) {
        logger.debug("Service: Fetching limit by ID: {}", id);
        Limit limit = findById(id);
        logger.debug("Limit found: Month={}, Year={} (ID: {})", limit.getMonth(), limit.getYear(), limit.getId());
        return this.limitMapper.toResponse(limit);
    }

    public LimitResponseDto getByYearAndMonth(Integer year, Integer month) {
        logger.debug("Service: Fetching limit for Year: {}, Month: {}", year, month);
        Limit limit = this.findByYearAndMonth(year,month);
        logger.debug("Limit found: Month={}, Year={} (ID: {})", limit.getMonth(), limit.getYear(), limit.getId());
        return this.limitMapper.toResponse(limit);
    }

    public LimitResponseDto create(LimitRequestDto limitRequestDto) {
        logger.debug("Service: Creating new limit for Month: {}, Year: {}", limitRequestDto.getMonth(), limitRequestDto.getYear());

        boolean limitExists = this.limitRepository.existsByMonthAndYear(
                limitRequestDto.getMonth(),
                limitRequestDto.getYear()
        );

        if (limitExists) {
            logger.error("Limit for Month: {} and Year: {} already exists",
                    limitRequestDto.getMonth(),
                    limitRequestDto.getYear());
            throw new EntityAlreadyExists("Limit with this month and year already exists");
        }

        Limit limit = this.limitMapper.toEntity(limitRequestDto);
        Limit savedLimit = this.limitRepository.save(limit);
        logger.debug("Limit created with ID: {}", savedLimit.getId());
        return this.limitMapper.toResponse(savedLimit);
    }

    public LimitResponseDto patch(UUID id, LimitRequestDto limitRequestDto) {
        logger.debug("Patching limit with ID: {}", id);
        Limit limit = this.findById(id);

        if (limitRequestDto.getLimitQuantity() != null) {
            logger.debug("Updating limit quantity from {} to {}", limit.getLimitQuantity(), limitRequestDto.getLimitQuantity());
            limit.setLimitQuantity(limitRequestDto.getLimitQuantity());
        }

        if (limitRequestDto.getMonth() != null) {
            logger.debug("Updating month from {} to {}", limit.getMonth(), limitRequestDto.getMonth());
            limit.setMonth(limitRequestDto.getMonth());
        }

        if (limitRequestDto.getYear() != null) {
            logger.debug("Updating year from {} to {}", limit.getYear(), limitRequestDto.getYear());
            limit.setYear(limitRequestDto.getYear());
        }

        Limit savedLimit = this.limitRepository.saveAndFlush(limit);
        logger.debug("Limit patched successfully with ID: {}", savedLimit.getId());
        return this.limitMapper.toResponse(savedLimit);
    }

    public Limit getCurrentLimit() {
        return this.findByYearAndMonth(ZonedDateTime.now().getYear(), ZonedDateTime.now().getMonthValue());
    }
}
