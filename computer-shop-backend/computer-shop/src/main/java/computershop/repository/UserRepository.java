package computershop.repository;

import computershop.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Long> {

    @Query("SELECT u from UserModel u WHERE u.login = :login")
    Optional<UserModel> getUserByCredential(String login);
    boolean existsByEmail(String email);
    boolean existsByLogin(String login);

    @Query("SELECT u from UserModel u where u.name LIKE %:searchWord% OR u.address LIKE %:searchWord% " +
            "OR u.email LIKE %:searchWord% OR u.login LIKE %:searchWord% OR u.surname LIKE %:searchWord%")
    Page<UserModel> findAllFilterable(Pageable paging, String searchWord);

}
