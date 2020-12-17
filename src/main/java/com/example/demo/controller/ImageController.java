package com.example.demo.controller;

import com.example.demo.util.FileDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
public class ImageController {
    @Autowired
    private FileDir fileDir;

    @RequestMapping(value = "/image/upload/{imageName}")
    @ResponseBody
    public byte[] uploadImage(@PathVariable(value = "imageName") String imageName) throws IOException {
        File serverFile = new File(fileDir.getFileDir()+"\\" + imageName);
        return Files.readAllBytes(serverFile.toPath());
    }
}
