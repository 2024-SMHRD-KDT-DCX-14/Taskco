package com.taskco.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping("/taskco")
	public String taskco() {
		return "login";
	}
	
}
