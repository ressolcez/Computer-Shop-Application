package computershop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    @NotEmpty(message = "Wprowadź imie")
    @Length(min = 3, max = 40, message = "Imie nie może być dłuższe niż 40 znaków")
    private String name;

    @Column(name = "surname")
    @NotEmpty(message = "Wprowadź nazwisko")
    @Length(max = 60, message = "Nazwisko nie może być dłuższe niż 40 znaków")
    private String surname;

    @Column(name = "login")
    @NotEmpty(message = "Wprowadź Login")
    @Length(max = 25, message = "Login nie może być dłuższy niż 25 znaków")
    private String login;

    @Column(name = "password")
    @NotEmpty(message = "Wprowadź Hasło")
    @Length(max = 70, message = "Hasło nie może być dłuższe niż 70 znaków")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\\S+$).{8,}$", message = "Hasło musi zawierać minimum 8 znaków, w tym małą i wielką literę cyfrę i znak specjalny")
    private String password;

    @Column(name = "email")
    @NotEmpty(message = "Wprowadź email")
    @Email(message = "Wprowadź Email")
    private String email;

    @Column(name = "address")
    @Length(max = 120, message = "Adres nie może być dłuższy niż 120 znaków")
    private String address;

    @Column(name = "house_number")
    @Length(max = 20, message = "Numer domu nie może być dłuższy niż 20 znaków")
    private String houseNumber;

    @Column(name = "postal_code")
    @Length(max = 20, message = "Kod pocztowy nie może być dłuższy niż 20 znaków")
    private String postalCode;

    @Column(name = "locked")
    private Boolean locked;

    @ManyToOne(optional = false)
    @JsonManagedReference
    @JoinColumn(name = "roles_model_id")
    private RolesModel rolesModel;

    @OneToMany(mappedBy = "userModel")
    @JsonBackReference
    private List<OpinionsModel> opinionsModels = new ArrayList<>();

    @OneToMany(mappedBy = "userModel", orphanRemoval = true)
    @JsonManagedReference
    private List<OrdersModel> ordersModels = new ArrayList<>();
}
