package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.Status;
import java.util.Optional;

public interface StatusService {
    Optional<Status> findStatusById(int id);
}
