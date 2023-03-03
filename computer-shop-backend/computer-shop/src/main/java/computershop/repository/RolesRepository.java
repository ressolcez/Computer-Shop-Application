package computershop.repository;

import computershop.model.RolesModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<RolesModel, Long> {
}