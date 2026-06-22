package com.linkvault.backend.dto;

import com.linkvault.backend.model.ShortLink;

public class ShortenResponse {
    
    private ShortLink link;
    private String qrCode;

    public ShortenResponse(ShortLink link, String qrCode) {
        this.link = link;
        this.qrCode = qrCode;
    }

    public ShortLink getLink() { return link; }
    public void setLink(ShortLink link) { this.link = link; }

    public String getQrCode() { return qrCode; }
    public void setQrCode(String qrCode) { this.qrCode = qrCode; }
}
