package hu.unideb.movilist.service.dto;

import lombok.Data;

@Data
public class UserMovieDto {
    private Long userId;
    private Long movieId;
    private String status;
    private Double rating;
}
