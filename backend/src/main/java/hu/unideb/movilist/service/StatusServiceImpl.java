package hu.unideb.movilist.service;

import hu.unideb.movilist.data.entity.Status;
import hu.unideb.movilist.data.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusServiceImpl(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public Optional<Status> findStatusById(int id) {
        return statusRepository.findById(id);
    }
}
