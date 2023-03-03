package computershop.controller;

import computershop.dto.contactForm.CreateContactFormMessage;
import computershop.service.ContactFormService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/contactForm")
public class ContactFormController {
    private final ContactFormService contactFormService;
    public ContactFormController(ContactFormService contactFormService) {
        this.contactFormService = contactFormService;
    }
    @PostMapping
    public ResponseEntity<Object> createMessage(@RequestBody @Valid CreateContactFormMessage createContactFormMessage){
        contactFormService.createMessage(createContactFormMessage);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
