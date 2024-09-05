package com.nanoDc.erp.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class IdentityStatusVO {
    @JsonProperty("status")
    private int status;

    @JsonProperty("message")
    private String message;

    @JsonProperty("completeDT")
    private String completeDT; // completeDT 필드 추가

    // 기본 생성자
    public IdentityStatusVO() {
    }

    // 상태와 메시지를 포함하는 생성자
    public IdentityStatusVO(int status, String message) {
        this.status = status;
        this.message = message;
    }

    // 상태, 메시지, completeDT를 포함하는 생성자
    public IdentityStatusVO(int status, String message, String completeDT) {
        this.status = status;
        this.message = message;
        this.completeDT = completeDT;
    }

    // Getter와 Setter 메소드
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCompleteDT() {
        return completeDT;
    }

    public void setCompleteDT(String completeDT) {
        this.completeDT = completeDT;
    }
}