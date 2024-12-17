package hu.unideb.movilist.data.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int statusId;

    @Column(name="name")
    private String statusName;

    public Status() {
    }

    public Status(int statusId, String statusName) {
        this.statusId = statusId;
        this.statusName = statusName;
    }

    public Status(String statusName) throws RuntimeException{
        this.statusName = statusName;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }
}
