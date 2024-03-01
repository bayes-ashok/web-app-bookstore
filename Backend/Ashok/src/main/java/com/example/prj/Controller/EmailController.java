//package com.example.prj.Controller;
//
////import com.online.canteen_management_system.dto.request.EmailRequest;
////import com.online.canteen_management_system.utils.ApiResponse;
//
//import com.example.prj.pojo.ApiResponse;
//import com.example.prj.pojo.EmailRequest;
//import com.example.prj.service.EmailService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//
////import javax.validation.Valid;
//import java.util.Map;
//
//
//@Controller
//@RequestMapping("email")
//@RequiredArgsConstructor
//@Validated
//public class EmailController {
//
//    private final EmailService emailService;
//    private final ApiResponse apiResponse;
//
//    @PostMapping("/customer-confirmation")
//    public ResponseEntity<Map<String, Object>> sendEmail(@Valid @RequestBody EmailRequest emailRequest) {
//        this.emailService.sendCustomerConfirmationEmail(emailRequest);
//        return apiResponse.successResponse("Email sent successfully.", true, null, emailRequest.getSendToEmail());
//
//    }
//
//
//}
