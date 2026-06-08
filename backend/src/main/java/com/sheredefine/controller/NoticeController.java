package com.sheredefine.controller;

import com.sheredefine.model.Notice;
import com.sheredefine.repository.NoticeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "http://localhost:5173")
public class NoticeController {

    private final NoticeRepository noticeRepository;

    public NoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        if (notice.getId() == null || notice.getId().isEmpty()) {
            notice.setId("notice-" + System.currentTimeMillis());
        }
        if (notice.getDate() == null || notice.getDate().isEmpty()) {
            notice.setDate(new java.text.SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date()));
        }
        if (notice.getType() == null || notice.getType().isEmpty()) {
            notice.setType("ANNOUNCEMENT");
        }
        return noticeRepository.save(notice);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable String id) {
        if (noticeRepository.existsById(id)) {
            noticeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
