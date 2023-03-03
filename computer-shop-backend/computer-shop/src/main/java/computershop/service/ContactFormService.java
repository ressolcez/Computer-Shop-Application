package computershop.service;

import computershop.dto.contactForm.CreateContactFormMessage;
import computershop.dto.productModel.AddProductDto;
import computershop.validations.ValidationsFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.Validator;
import java.util.Set;

@Service
public class ContactFormService {
    private final EmailService emailService;
    private final ValidationsFacade validationsFacade;
    public ContactFormService(EmailService emailService, ValidationsFacade validationsFacade) {
        this.emailService = emailService;
        this.validationsFacade = validationsFacade;
    }

    public void createMessage(CreateContactFormMessage createContactFormMessage) {

        validationsFacade.validate(createContactFormMessage);
        emailService.createMessageContactForm(createContactFormMessage);
    }
}
