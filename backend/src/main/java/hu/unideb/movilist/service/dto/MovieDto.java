package hu.unideb.movilist.service.dto;

import lombok.Data;

@Data
public class MovieDto {
    private Long id;
    private String title;
    private String description;
    private String releaseDate;
    private String posterUrl;
}
