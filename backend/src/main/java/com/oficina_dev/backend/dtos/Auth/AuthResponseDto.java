package com.oficina_dev.backend.dtos.Auth;

import com.oficina_dev.backend.dtos.Voluntary.VoluntaryResponseDto;
import com.oficina_dev.backend.models.Voluntary;

public record AuthResponseDto( VoluntaryResponseDto voluntary )
{ }
