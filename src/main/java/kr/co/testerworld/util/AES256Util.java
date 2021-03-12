package kr.co.testerworld.util;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

public class AES256Util {
	
	private static String iv;
	private static Key keySpec;
	private static final String KEY = "WORLDOFTESTERS202010";					//랜덤으로 생성되게 하는 것이 좋음
	
	private AES256Util() {}
	private static class AES256UtilHolder{
		private static final AES256Util AES256_UTIL = new AES256Util();
	}
	
	public static AES256Util loader() throws UnsupportedEncodingException{
		iv = KEY.substring(0, 16);
		
		byte[] keyBytes = new byte[16];
		byte[] b = KEY.getBytes("UTF-8");
		int len = b.length;
		if(len > keyBytes.length) len = keyBytes.length;
		System.arraycopy(b, 0, keyBytes, 0, len);
		
		keySpec = new SecretKeySpec(keyBytes, "AES");
		
		return AES256UtilHolder.AES256_UTIL;
	}
	
	public String aesEncode(String str) throws IllegalBlockSizeException, 
												BadPaddingException, 
												UnsupportedEncodingException, 
												InvalidKeyException, 
												InvalidAlgorithmParameterException, 
												NoSuchAlgorithmException, 
												NoSuchPaddingException {
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
		
		byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
		String enStr = new String(Base64.encodeBase64(encrypted));
		
		return enStr;
	}
	
	public String aesDecode(String str) throws UnsupportedEncodingException, 
												IllegalBlockSizeException, 
												BadPaddingException, 
												InvalidKeyException, 
												InvalidAlgorithmParameterException, 
												NoSuchAlgorithmException, 
												NoSuchPaddingException {
		Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
		c.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes("UTF-8")));
		
		byte[] byteStr = Base64.decodeBase64(str.getBytes());
		return new String(c.doFinal(byteStr), "UTF-8");
	}
}