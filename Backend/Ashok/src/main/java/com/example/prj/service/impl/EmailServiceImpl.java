//package com.example.prj.service.impl;
//
//
////import com.online.canteen_management_system.dto.request.EmailRequest;
//import com.example.prj.pojo.EmailRequest;
//import com.example.prj.service.EmailService;
//import freemarker.template.Configuration;
//import freemarker.template.Template;
//import jakarta.mail.internet.MimeMessage;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
//import org.springframework.stereotype.Service;
//import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
//
//import java.nio.charset.StandardCharsets;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class EmailServiceImpl implements EmailService {
//
//    private final JavaMailSender getJavaMailSender;
//    private final ThreadPoolTaskExecutor taskExecutor;
//
//    @Autowired
//    @Qualifier("emailConfigBean")
//    private Configuration emailConfig;
//
//
//    @Override
//    public void sendCustomerConfirmationEmail(EmailRequest emailRequest) {
//        try {
//            Map<String, String> model = new HashMap<>();
//
//            MimeMessage message = getJavaMailSender.createMimeMessage();
//            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
//
//            model.put("email", emailRequest.getSendToEmail());
//            model.put("url", "localhost:8082/");
//
//            Template template = emailConfig.getTemplate("email.ftl");
//            String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
//
//            mimeMessageHelper.setTo(emailRequest.getSendToEmail());
//            mimeMessageHelper.setFrom("canteenmanagement5@gmail.com");
//            mimeMessageHelper.setText(html, true);
//            mimeMessageHelper.setSubject("Registration");
//
//            taskExecutor.execute(new Thread() {
//                public void run() {
//                    getJavaMailSender.send(message);
//                }
//            });
//        } catch (Exception e) {
//
//            e.printStackTrace();
//        }
//    }
//}
